---
tags:
- AI & Machine Learning
title: Self drifting car
date: 2020-08-01
image: "/assets/images/jetracer.png"
caption: My DIY robocar.
excerpt: My hacky implementation of an MIT paper.
code: ''
external_link_name: ''
external_link: ''
download: ''
read_more_bypass: ''

---
A few years back, I saw [this video](https://www.youtube.com/watch?v=opsmd5yuBF0){:target="_blank"} where MIT researchers made an RC car drift by itself. I had no idea how it was done but thought it was very cool.  
Fast forward to April 2020 where I saw [this tweet](https://twitter.com/a1k0n/status/1236716786751422465){:target="_blank"} showing a very fast autonomous RC car. It revived my interest and I researched the subject, built an [Nvidia Jetracer car](https://github.com/NVIDIA-AI-IOT/jetracer){:target="_blank"} and hacked together an implementation of the original paper.  
Except I didn't trained in a sim and transfered the learnings to the real world which was kind of the point of the paper, but it works and I have lots of ideas for improvements!

<div class="flex w-full justify-center">
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Autonomous drifting on the <a href="https://twitter.com/nvidia?ref_src=twsrc%5Etfw">@nvidia</a> <a href="https://twitter.com/hashtag/jetracer?src=hash&amp;ref_src=twsrc%5Etfw">#jetracer</a> using RL. <a href="https://twitter.com/hashtag/diyrobocar?src=hash&amp;ref_src=twsrc%5Etfw">#diyrobocar</a> <a href="https://twitter.com/hashtag/jetsonnano?src=hash&amp;ref_src=twsrc%5Etfw">#jetsonnano</a> <a href="https://t.co/LOZkBjRpxp">pic.twitter.com/LOZkBjRpxp</a></p>&mdash; Armand du Parc Locmaria (@armand_dpl) <a href="https://twitter.com/armand_dpl/status/1302644348132233217?ref_src=twsrc%5Etfw">September 6, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
</div>