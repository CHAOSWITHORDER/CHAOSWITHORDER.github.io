---
title: "Hello World"
date: 2022-05-13T12:44:32+08:00
description: ""
featured_image: "/images/hello-world-figlet.png"
# images is optional, but needed for showing Twitter Card
images: ["/images/hello-world-figlet.png"]
tags: ["Hello World"]
categories:
comment: true
draft: false
---

> 定理：若$ac\equiv bc \pmod m$，且若$(m,c)=d$，则
> $$
> a\equiv b \pmod{\frac{m}{d}}
> $$
> 证明：因为$m|c(a-b)$，故$\frac{m}{d}|\frac{c}{d}(a-b)$，又因为$(\frac{m}{d},\frac{c}{d})=1$，所以$\frac{m}{d}|(a-b)$
>
> 证毕

定理：中国剩余定理
<div>
$$
\begin{aligned}
&& & x\equiv b_{1}\pmod{m_{1}}\\
&& & x\equiv b_{2}\pmod{m_{2}}\\
&& & \quad\quad\quad...\\
&& & x\equiv b_{k}\pmod{m_{k}}\tag{1}
\end{aligned}
$$
</div>

定理$1$：设$m_{1},m_{2},...,m_{k}$是$k$个两两互质的正整数,$m=m_{1}···m_{k},m=m_{i}M_{i}(i=1,...,k)$.

则同余式组$(1)$有唯一解