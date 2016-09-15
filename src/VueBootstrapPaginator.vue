<template>
    <ul class="pagination">
        <li v-for="page in pageNav" :class="{'active': page.active}">
            <a href="#" @click="currentPage = page.pageNum">
                <div v-show="!isNaN(page.keySymbol) || page.keySymbol == '...'">
                    {{ page.keySymbol }}
                </div>
                <div v-else>
                    <i class="fa" aria-hidden="true" :class="{
                'fa-angle-right': page.keySymbol == '>',
                'fa-angle-left': page.keySymbol == '<',
                'fa-angle-double-right': page.keySymbol == '>:',
                'fa-angle-double-left': page.keySymbol == ':<'
            }"></i>
                </div>
            </a>
        </li>
    </ul>
</template>

<script>
export default {

    data () {
        return {
            totalPages: 0,
            currentPage: 0,
            pageNav: ''
        }
    },

    props: {
        apiUrl: {
            type: String,
            required: true
        },
        pagesPerSegment: {
            type: String,
            required: true
        },
        pageData: {
            type: Array,
            required: true,
            twoWay: true
        }
    },

    watch: {
        currentPage () {
            let self = this;
            self.getPageData(self.currentPage);
            self.pageNav = self.paginate();
        }
    },

    methods: {
        paginate () {
            let self = this;
 
            let pages = [];
            let totalSegments = Math.floor((self.totalPages - 1) / self.pagesPerSegment) + 1;

            if (self.currentPage < 1 || self.currentPage > self.totalPages) {
                self.currentPage = 1;
            }

            let currentSegment = Math.floor((self.currentPage - 1) / self.pagesPerSegment) + 1;
            let endPage =
                (currentSegment * self.pagesPerSegment) > self.totalPages
                    ? self.totalPages
                    : (currentSegment * self.pagesPerSegment);
            let startPage =
                (self.pagesPerSegment > endPage)
                    ? 1
                    : endPage - (self.pagesPerSegment - 1);

            if (currentSegment > 1) {
                pages.push({
                    keySymbol: ':<',
                    pageNum: 1,
                    active: false
                });
                pages.push({
                    keySymbol: '<',
                    pageNum: self.currentPage - 1,
                    active: false
                });
                pages.push({
                    keySymbol: '...',
                    pageNum: startPage - 1,
                    active: false
                });
            }

            for (let p = startPage; p <= endPage; p++) {
                pages.push({
                    keySymbol: '' + p,
                    pageNum: p,
                    active: p == self.currentPage
                });
            }

            if (currentSegment < totalSegments) {
                pages.push({
                    keySymbol: '...',
                    pageNum: endPage + 1,
                    active: false
                });
                pages.push({
                    keySymbol: '>',
                    pageNum: parseInt(self.currentPage) + 1,
                    active: false
                });
                pages.push({
                    keySymbol: '>:',
                    pageNum: self.totalPages,
                    active: false
                });
            }

            return pages;
        },

        getPageData (pageNum) {
            let self = this;
            self.$http.get(self.apiUrl + pageNum)
                .then(function(response){
                    self.$set('pageData', response.data.data);
                    self.totalPages = response.data.pagination.lastPage;
                    self.currentPage = pageNum;
                });
        }

    },

    ready () {
        let self = this;
        self.getPageData(1);
    }

}
</script>