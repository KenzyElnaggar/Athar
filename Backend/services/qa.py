"""
Question answering service using OpenAI GPT for Egyptian hieroglyph queries.
"""

import logging
import os
from typing import Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

try:
    import openai
    from openai import OpenAI
except ImportError:
    openai = None
    OpenAI = None

logger = logging.getLogger(__name__)

# Initialize OpenAI client
client = None
if OpenAI:
    try:
        api_key = os.getenv("OPENAI_API_KEY")
        if api_key:
            client = OpenAI(api_key=api_key)
            logger.info("OpenAI client initialized successfully")
        else:
            logger.warning("OPENAI_API_KEY not found in environment variables")
    except Exception as e:
        logger.error(f"Failed to initialize OpenAI client: {e}")

def answer_question(question: str, glyph_translation: str, context: Optional[str] = None) -> str:
    """
    Answer a question about an Egyptian hieroglyph using OpenAI GPT.
    
    Args:
        question (str): User's question about the hieroglyph
        glyph_translation (str): English translation of the hieroglyph
        context (str, optional): Additional context about the hieroglyph
        
    Returns:
        str: GPT's answer to the question
        
    Raises:
        RuntimeError: If OpenAI client is not available or API call fails
    """
    if not client:
        logger.error("OpenAI client not available")
        return "Sorry, the question answering service is currently unavailable. Please check your OpenAI API configuration."
    
    try:
        # Construct the prompt
        prompt = f"""You are an expert Egyptologist and hieroglyph specialist. 
        
The user is asking about an Egyptian hieroglyph that translates to: "{glyph_translation}"

{f"Additional context: {context}" if context else ""}

User's question: {question}

Please provide a helpful, accurate, and educational answer about this hieroglyph. 
Include historical context, cultural significance, and any relevant details that would help the user understand this symbol better.
Keep your response informative but accessible to someone learning about Egyptian hieroglyphs."""

        # Make API call to OpenAI
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # You can change this to gpt-4 for better responses
            messages=[
                {"role": "system", "content": "You are a knowledgeable Egyptologist specializing in ancient Egyptian hieroglyphs and culture."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        answer = response.choices[0].message.content.strip()
        logger.info(f"Generated answer for question about '{glyph_translation}'")
        return answer
        
    except Exception as e:
        logger.error(f"Error calling OpenAI API: {e}")
        return f"Sorry, I encountered an error while trying to answer your question: {str(e)}"

def get_glyph_info(glyph_code: str, glyph_translation: str) -> str:
    """
    Get general information about a hieroglyph.
    
    Args:
        glyph_code (str): The glyph code (e.g., "G17")
        glyph_translation (str): English translation of the hieroglyph
        
    Returns:
        str: General information about the hieroglyph
    """
    return answer_question(
        f"What is the {glyph_code} hieroglyph and what does it represent?",
        glyph_translation,
        f"Glyph code: {glyph_code}"
    )

def is_service_available() -> bool:
    """
    Check if the question answering service is available.
    
    Returns:
        bool: True if OpenAI client is available and configured
    """
    return client is not None and os.getenv("OPENAI_API_KEY") is not None

def get_available_models() -> list:
    """
    Get list of available OpenAI models (for debugging/configuration).
    
    Returns:
        list: Available model names
    """
    if not client:
        return []
    
    try:
        models = client.models.list()
        return [model.id for model in models.data]
    except Exception as e:
        logger.error(f"Error fetching available models: {e}")
        return []
