FROM ruby:3.2.2

# Install dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

# Set working directory
WORKDIR /buddy

# Install gems
COPY Gemfile Gemfile.lock ./
RUN gem install bundler
RUN bundle install

# Copy the application
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["rails", "server", "-b", "0.0.0.0"]