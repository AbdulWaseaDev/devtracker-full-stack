pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
        DEPLOY_DIR_FRONTEND = '/var/www/html'         // For React
        DEPLOY_DIR_BACKEND = '/var/www/backend-app'   // For Node.js
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo "Cloning repo..."
                git 'https://github.com/AbdulWaseaDev/devtracker-full-stack.git'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir(FRONTEND_DIR) {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir(FRONTEND_DIR) {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                echo "Deploying frontend to $DEPLOY_DIR_FRONTEND"
                sh "rm -rf $DEPLOY_DIR_FRONTEND/*"
                sh "cp -r ${FRONTEND_DIR}/build/* $DEPLOY_DIR_FRONTEND/"
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir(BACKEND_DIR) {
                    sh 'npm install'
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                echo "Deploying backend to $DEPLOY_DIR_BACKEND"
                sh "rm -rf $DEPLOY_DIR_BACKEND/*"
                sh "cp -r ${BACKEND_DIR}/* $DEPLOY_DIR_BACKEND/"
            }
        }

        stage('Start Backend Server') {
            steps {
                dir(DEPLOY_DIR_BACKEND) {
                    sh 'pm2 restart app.js || pm2 start app.js' // or your entry file
                }
            }
        }
    }
}