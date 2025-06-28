pipeline {
  agent any

  // 1) react to GitHub webhooks
  triggers {
    githubPush()
  }

  // 2) global environment vars from Jenkins credentials
  environment {
    COOLIFY_TOKEN = credentials('3|unmr76kavCVt9zMwDsnag4WBVmUYop4pmsdoKXD4f03815a3')   // Jenkins “Secret text” ID
    COOLIFY_APP_ID = credentials('qsg48koo8ccwwog8ck0cw8w8') // Jenkins “Secret text” ID
  }

  stages {
    stage('Checkout') {
      steps {
        // public repo: no credentials block
        checkout scm
      }
    }

    stage('Build Frontend') {
      when {
        // only if something in devtracker-frontend/ changed
        changeset "**/devtracker-frontend/**"
      }
      steps {
        dir('devtracker-frontend') {
          echo "Changes detected in frontend – building & deploying..."
          
          // install & build (customize as needed)
          sh 'npm install'
          sh 'npm run build'

          // trigger Coolify redeploy via CLI
          sh """
            npx coolify deploy \\
              --token=${3|unmr76kavCVt9zMwDsnag4WBVmUYop4pmsdoKXD4f03815a3} \\
              --app-id=${qsg48koo8ccwwog8ck0cw8w8}
          """

          // --- OR, use Curl to hit Coolify REST API: ---
          // sh """
          //   curl -X POST \\
          //     -H "Authorization: Bearer ${COOLIFY_TOKEN}" \\
          //     -H "Content-Type: application/json" \\
          //     "https://129.151.130.23/api/app/${COOLIFY_APP_ID}/deploy"
          // """
        }
      }
    }

    stage('Backend Placeholder') {
      when {
        changeset "**/devtracker-backend/**"
      }
      steps {
        echo "Backend changes detected – this pipeline is configured elsewhere."
      }
    }
  }

  post {
    success {
      echo "Pipeline completed."
    }
    failure {
      mail to: 'berlin.techs.employees@gmail.com',
           subject: "🚨 Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
           body: "Check console output: ${env.BUILD_URL}console"
    }
  }
}
