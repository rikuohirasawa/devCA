FROM --platform=linux/amd64 python:3.11
WORKDIR /app
COPY . .
EXPOSE 80
RUN pip3 install -r requirements.txt
COPY server.py .
CMD [ "python", "./server.py" ]