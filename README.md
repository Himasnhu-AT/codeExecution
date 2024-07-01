# CodeExecuter

A microservice made for project [CpMasters](https://github.com/Himasnhu-AT/cpmasters). This microservice is responsible for executing the code and returning the output. It uses docker to execute the code in a safe environment.

> [!IMPORTANT]
> This is a work in progress project. It's not ready for production use.

## TODO:

- [x] Check working with js (inital version)
- [ ] Check working with other languages (python, c, c++, java)
- [ ] Add proper error handling and logging (for environment variables and code execution)
- [ ] Add proper documentation
- [ ] Add proper testing
- [ ] Add proper versioning
- [ ] sample docker `yaml` for other languages

## How to run

#### Using Git

```bash
git clone https://github.com/Himasnhu-AT/codeexecuter.git
cd codeexecuter
docker-compose up
```

It'll run the microservice on port 3000, running javascript code.

#### Using Docker

```bash
version: '3.8'
services:
  code_executor_js_service:
    container_name: code_executor_js
    image: himanshu806/code_executer:v0.2.0
    environment:
      - LANGUAGE=js
      - EXECCOMMAND=node
    ports:
      - '3000:3000'
```

## LICENSE

view [LICENSE](LICENSE) file
