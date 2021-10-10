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
}
