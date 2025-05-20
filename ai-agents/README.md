## AI Agents

### Set up
```
python -m venv .venv
.venv\Scripts\activate

pip install -r requirements.txt
# Create a .env file
```

### Run
```
python transcriber-online.py dev
```


### Build and deploy
```
gcloud builds submit --tag us-east1-docker.pkg.dev/project-1-test-ai/hackathon/ai-agents
gcloud run deploy ai-agents --image us-east1-docker.pkg.dev/project-1-test-ai/hackathon/ai-agents --platform managed --region us-east1 --allow-unauthenticated
```
