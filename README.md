# axum-todo压测

## 目标项目

<https://github.com/liuquanhao/axum-todo>

## k6文档

https://k6.io/docs/

## 安装

```bash
sudo mkdir /root/.gnupg
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

## 测试案例

```bash
k6 run ./create_todo_stress_test.js
```