FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Create directories for transcriptions
RUN mkdir -p transcriptions user_speech

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Run the script
CMD ["python3", "transcriber-online.py", "dev"] 