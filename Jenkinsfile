def imageName = 'lucas/movies-store'

node('workers'){
    stage('Checkout'){
        checkout scm
    }

    def imageTest = docker.build("${imageName}-test", "-f Dockerfile.test .")

    stage('Test') {
        parallel(
            'Qulity Tests' {
            imageTest.inside{
                sh 'npm run lint'
            }
        }

        'Integration Tests' {
        sh "docker run --rm ${imageName}-test npm run test"
        }

        'Coverage Reports' {
        sh "docker run --rm -v $PWD/coverage:/app/coverage ${imageName}-test npm run coverage-html"
        publishHTML (target: [
            allowMissing: false,
            alwaysLinkToLastBuild: false,
            keepAll: true,
            reportDir: "$PWD/coverage",
            reportFiles: "index.html",
            reportName: "Coverage Report"
        ])
        }
        )
    }

}
