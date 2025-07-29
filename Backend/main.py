from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import upload, question

# Create FastAPI app instance
app = FastAPI(
    title="Athar Backend",
    description="Backend API for Egyptian hieroglyph recognition and translation",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(upload.router, prefix="/api/v1", tags=["upload"])
app.include_router(question.router, prefix="/api/v1", tags=["question"])

@app.get("/")
async def root():
    """Root endpoint for health check"""
    return {"message": "Athar Backend API is running", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "athar-backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
