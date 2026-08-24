pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
        DOCKER_REPO = 'uday951541'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Uday951541/employee-management-cicd.git'
            }
        }

        stage('Build Backend (Maven)') {
            steps {
                dir('backend/employee-backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build -t ${DOCKER_REPO}/employee-backend:${IMAGE_TAG} ./backend/employee-backend"
                sh "docker build -t ${DOCKER_REPO}/employee-frontend:${IMAGE_TAG} ./backend/frontend"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh "echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin"
                sh "docker push ${DOCKER_REPO}/employee-backend:${IMAGE_TAG}"
                sh "docker push ${DOCKER_REPO}/employee-frontend:${IMAGE_TAG}"
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}