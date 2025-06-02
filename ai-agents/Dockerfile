ARG PYTHON_VERSION=3.11.6
FROM python:${PYTHON_VERSION}-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1

# Install gcc and other build dependencies.
RUN apt-get update && \
    apt-get install -y \
    gcc \
    python3-dev \
    build-essential \
    wkhtmltopdf \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN python3 -m pip install --user --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Create directories for transcriptions
RUN mkdir -p transcriptions user_speech

# ensure that any dependent models are downloaded at build-time
RUN python3 transcriber-online.py download-files

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV HOST=0.0.0.0
ENV PORT=8081

# expose healthcheck port
EXPOSE 8081

# Make scripts executable
RUN chmod +x transcriber-online.py web_server.py

# Run both services
CMD python3 web_server.py & python3 transcriber-online.py dev 