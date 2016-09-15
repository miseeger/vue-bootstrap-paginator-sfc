# vue-bootstrap-paginator-sfc
A simple Bootstrap Paginator component provided as single-file-component (with vue-resource) for vue.js.

This is the advanced Vue vue-bootstrap-paginator-component based on 
[my first component](https://github.com/miseeger/vue-bootstrap-paginator) 
which was a result of my homework to the book [The Majesty Of Vue.js](https://leanpub.com/vuejs). 
It provides a Bootstrap paginator in order to navigate through paginated Lists that are delivered 
from an apropriate Web API endpoint. 

The example page also uses the Web API provided from my [WebApiCoreExample project](https://github.com/miseeger/WebApiCoreExample).

![PaginatorStart](https://github.com/miseeger/vue-bootstrap-paginator/blob/master/img/paginator_1.png?raw=true "Paginator first page")
![PaginatorEnd](https://github.com/miseeger/vue-bootstrap-paginator/blob/master/img/paginator_2.png?raw=true "Paginator last page")

The component itself needs to be fed with three properties:

* __api-url__ - The URL to the API which delivers the paged data to be displayed.
* __pages-per-segment__ - Number of page "buttons" shown in the paginator control.
* __page-data__ - The retrieved page data which is two-way-bound to the component.

The Vue element itself has to be prepared with the declaration of the VueBootstrapPaginator
in order to use it and `pageData` has to be defined in the data of the Vue element like this:

```javascript
var vm = new Vue({
    el: 'body',
    components: {
        'BsPaginator': VueBootstrapPaginator
    },
    data: {
        pageData: []
    }
});
``` 

When the initialization is done, the paginator can be used:
```html
<div class="col-md-12">
  <h1>Let's hear some stories!</h1>
  <bs-paginator 
    api-url="http://localhost:5000/api/stories/page/"
    pages-per-segment="2"
    :page-data.sync="pageData">
  </bs-paginator>
</div>
```

__Only the `page-data` property has to be bound two-way__!

When downloading the sources you'll first have to follow these steps:
```
npm install
```
For development start
```
npm run dev
```
For building the library start
```
npm run building
```


