FROM python:3.11
ADD ./ app/
EXPOSE 8000/tcp
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY server.py .
CMD [ "python", "./server.py" ]