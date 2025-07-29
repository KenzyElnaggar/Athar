"""
Question route for answering queries about Egyptian hieroglyphs.
"""

import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from services.qa import answer_question, is_service_available

logger = logging.getLogger(__name__)
router = APIRouter()

class QuestionRequest(BaseModel):
    """Request model for question endpoint."""
    question: str = Field(..., min_length=1, max_length=1000, description="User's question about the hieroglyph")
    glyph_translation: str = Field(..., min_length=1, max_length=100, description="English translation of the hieroglyph")
    context: str = Field("", max_length=500, description="Additional context about the hieroglyph (optional)")

class QuestionResponse(BaseModel):
    """Response model for question endpoint."""
    success: bool
    answer: str
    question: str
    glyph_translation: str

@router.post("/question", response_model=QuestionResponse)
async def ask_question(request: QuestionRequest):
    """
    Ask a question about an Egyptian hieroglyph.
    
    Args:
        request (QuestionRequest): Contains the question and glyph translation
        
    Returns:
        QuestionResponse: Contains the AI-generated answer
        
    Raises:
        HTTPException: If the question answering service is unavailable
    """
    try:
        # Check if the QA service is available
        if not is_service_available():
            logger.error("Question answering service is not available")
            raise HTTPException(
                status_code=503,
                detail="Question answering service is currently unavailable. Please check your OpenAI API configuration."
            )
        
        logger.info(f"Processing question about '{request.glyph_translation}': {request.question}")
        
        # Get the answer from OpenAI
        try:
            answer = answer_question(
                question=request.question,
                glyph_translation=request.glyph_translation,
                context=request.context if request.context else None
            )
        except Exception as e:
            logger.error(f"Error getting answer from OpenAI: {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to generate answer: {str(e)}"
            )
        
        # Return the response
        response = QuestionResponse(
            success=True,
            answer=answer,
            question=request.question,
            glyph_translation=request.glyph_translation
        )
        
        logger.info(f"Successfully answered question about '{request.glyph_translation}'")
        return response
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"Unexpected error processing question: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@router.get("/question/health")
async def question_health_check():
    """
    Health check for the question answering service.
    
    Returns:
        dict: Health status of the question answering service
    """
    try:
        service_available = is_service_available()
        return {
            "status": "healthy" if service_available else "unhealthy",
            "service": "question_answering",
            "openai_available": service_available,
            "message": "Service is ready" if service_available else "OpenAI API not configured"
        }
    except Exception as e:
        logger.error(f"Question health check failed: {e}")
        return {
            "status": "unhealthy",
            "service": "question_answering",
            "error": str(e)
        }

@router.get("/question/example")
async def get_example_question():
    """
    Get an example question request for testing.
    
    Returns:
        dict: Example question request
    """
    return {
        "question": "What does this hieroglyph represent and what was its significance in ancient Egypt?",
        "glyph_translation": "sun",
        "context": "This is the G17 hieroglyph, commonly found in royal names and religious texts."
    }
