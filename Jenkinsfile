pipeline {
  agent any

  tools {
    nodejs '24.3.0' // Make sure Node.js is configured in Jenkins Global Tool Configuration
  }

  triggers {
    githubPush() // Auto-trigger from GitHub webhook
  }

  environment {
    COOLIFY_TOKEN  = credentials('coolify-token')     // Must be created in Jenkins Credentials
    COOLIFY_APP_ID = credentials('coolify-app-id')    // Same here
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Frontend & Redeploy') {
      // Remove 'when' condition to always trigger build/deploy
      steps {
        dir('devtracker-frontend') {
          sh 'npm install'
          sh 'npm run build'

          sh """
            npx coolify deploy \
              --token=\$COOLIFY_TOKEN \
              --app-id=\$COOLIFY_APP_ID
          """
        }
      }
    }

    // Optional backend deployment block
    // Uncomment if you want backend redeployment too
    // stage('Build Backend & Redeploy') {
    //   steps {
    //     dir('devtracker-backend') {
    //       sh 'npm install'
    //       sh """
    //         npx coolify deploy \
    //           --token=\$COOLIFY_TOKEN \
    //           --app-id=<YOUR_BACKEND_COOLIFY_APP_ID>
    //       """
    //     }
    //   }
    // }

  }

  post {
    success {
      echo "✅ Build & Coolify deployment succeeded!"
    }
    failure {
      echo "❌ Build or Coolify deployment failed!"
      // Uncomment to send email on failure
      // mail to: 'berlin.techs.employees@gmail.com',
      //      subject: "🚨 Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
      //      body: "Check console output: ${env.BUILD_URL}console"
    }
  }
}
