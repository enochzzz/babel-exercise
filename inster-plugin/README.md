- v1: convert ```console.log(1);``` to ```console.log(fileName（rows，cols）：, 1););```

- v2: convert ```console.log(1);``` to ```console.log(fileName（rows，cols）：) /n console.log(1)```



```
关于什么时候用types和template，大致可以认为：
1. 当两个节点组装为新节点时，用types（可以看types的文档的参数）
2. 传入代码字符串获得ast节点时，用template（expression\statems）
```
