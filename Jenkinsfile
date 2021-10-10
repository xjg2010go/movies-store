def imageName = 'lucas/movies-store'

node('workers'){
    stage('Checkout'){
        checkout scm
    }

    def imageTest = docker.build("${imageName}-test", "-f Dockerfile.test")

    stage('Qulity Tests') {
        imageTest.inside{
            sh 'npm run lint'
        }
    }

    stage('Integration Tests') {
        sh "docker run --rm ${imageName}-test npm run test"
    }

    stage('Coverage Reports') {
        sh "docker run --rm ${imageName}-test npm run coverage-text"
    }
}
