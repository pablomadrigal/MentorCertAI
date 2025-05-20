ARG PYTHON_VERSION=3.11.6
FROM python:${PYTHON_VERSION}-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1

# Create a non-privileged user that the app will run under.
# See https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/home/appuser" \
    --shell "/sbin/nologin" \
    --uid "${UID}" \
    appuser


# Install gcc and other build dependencies.
RUN apt-get update && \
    apt-get install -y \
    gcc \
    python-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*


USER appuser


RUN mkdir -p /home/appuser/.cache
RUN chown -R appuser /home/appuser/.cache

WORKDIR /home/appuser

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN python -m pip install --user --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Create directories for transcriptions
RUN mkdir -p transcriptions user_speech


# ensure that any dependent models are downloaded at build-time
RUN python transcriber-online.py download-files

# Set environment variables
ENV PYTHONUNBUFFERED=1


# expose healthcheck port
EXPOSE 8081

# Run the script
CMD ["python", "transcriber-online.py", "dev"] 