<template>
	<div class="container">
	<nav class="pagination-container">
		<ul class="pagination">
			<li class="page-item"><a class="page-link" href="#">Previous</a></li>
			<li class="page-item"><a class="page-link" href="#">1</a></li>
			<li class="page-item"><a class="page-link" href="#">2</a></li>
			<li class="page-item"><a class="page-link" href="#">3</a></li>
			<li class="page-item"><a class="page-link" href="#">4</a></li>
			<li class="page-item"><a class="page-link" href="#">5</a></li>
			<li class="page-item"><a class="page-link" href="#">Next</a></li>
		</ul>
	</nav>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style>

.pagination-container {
	display: flex;
	justify-content: center;
	margin: 0px 0px 10px;
}
.pagination>li>a, .pagination>li>span {
	position: relative;
	float: left;
	background-color: pink;
	background-color: pink;
	padding: 10px 24px;
	margin-left: -1px;
	line-height: 1.42857143;
	color: #000;
	font-weight: bold;
	text-decoration: none;
	background-color: antiquewhite;
	border: 1px solid #ddd;
}

</style>