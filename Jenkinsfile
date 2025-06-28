pipeline {
  agent any
  triggers { githubPush() }

  environment {
    // these two IDs must match the “ID” fields of your Jenkins credentials
    COOLIFY_TOKEN  = credentials('coolify-token')
    COOLIFY_APP_ID = credentials('coolify-app-id')
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build Frontend') {
      when { changeset "**/devtracker-frontend/**" }
      steps {
        dir('devtracker-frontend') {
          sh 'npm install'
          sh 'npm run build'

          // now reference the env vars, not literal strings
          sh """
            npx coolify deploy \
              --token=\$COOLIFY_TOKEN \
              --app-id=\$COOLIFY_APP_ID
          """
        }
      }
    }

    // …
  }

  post {
    failure {
      mail to: 'berlin.techs.employees@gmail.com',
           subject: "🚨 Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
           body: "Check console output: ${env.BUILD_URL}console"
    }
  }
}
