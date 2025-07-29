# Athar Backend

A FastAPI-based backend service for Egyptian hieroglyph recognition and translation. Users can upload images of hieroglyphs, get automatic recognition and translation, and ask follow-up questions about the symbols.

## Features

- **Image Upload & Recognition**: Upload images of Egyptian hieroglyphs for automatic recognition
- **Glyph Translation**: Translate recognized glyph codes to English meanings
- **Question Answering**: Ask questions about hieroglyphs using OpenAI GPT integration
- **RESTful API**: Clean, documented API endpoints with proper error handling
- **Image Validation**: Comprehensive image validation and preprocessing
- **Extensible Architecture**: Easy to replace placeholder model with real PyTorch model

## Tech Stack

- **Python 3.8+**
- **FastAPI** - Modern, fast web framework for building APIs
- **PyTorch** - Deep learning framework (placeholder implementation ready for real model)
- **Pillow** - Image processing and manipulation
- **OpenAI API** - GPT integration for question answering
- **python-dotenv** - Environment variable management
- **Uvicorn** - ASGI server for running the FastAPI application

## Project Structure

```
Backend/
├── main.py                        # FastAPI app entry point
├── requirements.txt               # Python dependencies
├── models/
│   └── glyph_model.py            # Glyph recognition model (placeholder)
├── services/
│   ├── translator.py             # Glyph code to English translation
│   └── qa.py                     # OpenAI GPT question answering
├── routes/
│   ├── upload.py                 # Image upload and processing endpoint
│   └── question.py               # Question answering endpoint
├── utils/
│   └── image_utils.py            # Image validation and preprocessing
├── data/
│   └── mapping.json              # Glyph code to English translation mapping
└── README.md                     # This file
```

## Setup Instructions

### 1. Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### 2. Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Athar/Backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

1. Create a `.env` file in the Backend directory:
```bash
touch .env
```

2. Add your OpenAI API key to the `.env` file:
```
OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: You'll need an OpenAI API key for the question answering feature. Get one from [OpenAI's website](https://platform.openai.com/api-keys).

### 4. Running the Application

#### Development Mode
```bash
python main.py
```

#### Production Mode
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### 5. API Documentation

Once the server is running, you can access:
- **Interactive API docs**: `http://localhost:8000/docs`
- **ReDoc documentation**: `http://localhost:8000/redoc`
- **OpenAPI schema**: `http://localhost:8000/openapi.json`

## API Endpoints

### Health Check
- `GET /` - Root endpoint with basic info
- `GET /health` - Health check endpoint

### Image Upload & Recognition
- `POST /api/v1/upload` - Upload and process hieroglyph image
- `GET /api/v1/upload/health` - Upload service health check

### Question Answering
- `POST /api/v1/question` - Ask questions about hieroglyphs
- `GET /api/v1/question/health` - Question service health check
- `GET /api/v1/question/example` - Get example question request

## Usage Examples

### 1. Upload and Recognize a Hieroglyph

```bash
curl -X POST "http://localhost:8000/api/v1/upload" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@hieroglyph_image.jpg"
```

**Response:**
```json
{
  "success": true,
  "label": "G17",
  "translation": "sun",
  "filename": "hieroglyph_image.jpg",
  "file_size": 12345
}
```

### 2. Ask a Question About a Hieroglyph

```bash
curl -X POST "http://localhost:8000/api/v1/question" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{
       "question": "What does this hieroglyph represent and what was its significance in ancient Egypt?",
       "glyph_translation": "sun",
       "context": "This is the G17 hieroglyph, commonly found in royal names and religious texts."
     }'
```

**Response:**
```json
{
  "success": true,
  "answer": "The sun hieroglyph (G17) represents the sun disk and was one of the most important symbols in ancient Egyptian religion...",
  "question": "What does this hieroglyph represent and what was its significance in ancient Egypt?",
  "glyph_translation": "sun"
}
```

## Configuration

### Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required for question answering)
- `LOG_LEVEL` - Logging level (default: INFO)
- `MAX_IMAGE_SIZE` - Maximum image file size in bytes (default: 10MB)

### Model Configuration

The current implementation uses a placeholder model that always returns "G17". To integrate your real PyTorch model:

1. Replace the `recognize_glyph()` function in `models/glyph_model.py`
2. Implement the `load_model()` and `preprocess_image()` functions
3. Update the model path and preprocessing parameters as needed

## Development

### Adding New Glyphs

To add new glyph codes and translations:

1. Edit `data/mapping.json`
2. Add new entries in the format: `"GLYPH_CODE": "english_translation"`

### Extending the API

The modular structure makes it easy to add new features:

- Add new routes in the `routes/` directory
- Create new services in the `services/` directory
- Extend utility functions in the `utils/` directory

### Testing

The API includes health check endpoints for testing service availability:

```bash
curl http://localhost:8000/health
curl http://localhost:8000/api/v1/upload/health
curl http://localhost:8000/api/v1/question/health
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input (e.g., wrong file type, missing parameters)
- **500 Internal Server Error**: Server-side processing errors
- **503 Service Unavailable**: External service unavailable (e.g., OpenAI API)

All errors return structured JSON responses with error details.

## Performance Considerations

- Image files are validated for size and format before processing
- The glyph mapping is cached in memory for fast lookups
- OpenAI API calls include timeout handling
- Image preprocessing optimizes files for model input

## Security

- CORS is configured for cross-origin requests (configure properly for production)
- File uploads are validated for type and size
- Environment variables are used for sensitive configuration
- Input validation is performed on all endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Add your license information here]

## Support

For questions or issues, please create an issue in the repository or contact the development team.
