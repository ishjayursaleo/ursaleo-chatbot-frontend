#!/bin/bash

export BUILD=true
export AWS_PROFILE=ursaleo-prod
export AWS_REGION=us-east-1
export AWS_ACCOUNT_ID=211125739464
export AWS_EKS_NAME=ursaleo-prod-eks
export NAMESPACE=prod
export HELM_EXPERIMENTAL_OCI=1
export VERSION=$(grep -E '"version"\s*:' package.json | sed 's/[^0-9.]//g')

if [ -z "$1" ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  echo "Usage: ./devops/build.sh [pkg|docker|helm|all]"
  echo "Examples:"
  echo "./devops/build.sh pkg    # Run the pkg section"
  echo "./devops/build.sh docker # Run the Docker deployment section"
  echo "./devops/build.sh helm   # Run the Helm deployment section"
  echo "./devops/build.sh all    # Run all sections"
  exit
fi

if [ "$1" = "pkg" ] || [ "$1" = "all" ]; then
     echo "start npm build"
     npm run build-prod
fi

if [ "$1" = "docker" ] || [ "$1" = "all" ]; then
     echo "start docker build"
     aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
     docker build -t ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/ursaleo-portal-frontend-prod:${VERSION} -f Dockerfile .
     docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/ursaleo-portal-frontend-prod:${VERSION}
fi

if [ "$1" = "helm" ] || [ "$1" = "all" ]; then
     aws eks update-kubeconfig --region ${AWS_REGION} --name ${AWS_EKS_NAME}

     aws ecr get-login-password \
          --region ${AWS_REGION} | helm registry login \
          --username AWS \
          --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

     helm upgrade --install --namespace ${NAMESPACE} --create-namespace --set image.tag=${VERSION} --version "1.0.0" -f prod-helm-values.yaml ursaleo-portal-frontend oci://${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/helm/ursaleo-portal-prod
     kubectl -n ${NAMESPACE} rollout restart deployment ursaleo-portal-frontend 
fi

