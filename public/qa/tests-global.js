suite('Global Tests',function(){
	test('page title',function(){
		assert(document.title && document.title.match(/\S/) && document.title.toUpperCase !== 'TODO');
	});
})