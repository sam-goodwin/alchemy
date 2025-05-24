FROM alpine:latest

# Define build arguments
ARG MESSAGE=default
ARG VERSION=1.0

# Use the build arguments
RUN echo "$MESSAGE (version $VERSION)" > /message.txt

# Display the content when container runs
CMD ["cat", "/message.txt"]
