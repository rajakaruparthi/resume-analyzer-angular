FROM nginx:alpine

# Copy the pre-built Angular browser bundles (built locally or by CI)
COPY dist/resume-analyzer-angular/browser /usr/share/nginx/html

# Copy our custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
