while [ 1 ]
do
	curl http://127.0.0.1:9235/stats 2&> /dev/null
done
