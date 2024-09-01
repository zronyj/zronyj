const { createApp } = Vue;

async function fetchData(url) {
    const response = await fetch(url);
    if (url.slice(-4) === 'json') {
        const parsed = await response.json();
        return parsed;
    }
    return response;
}

const app = createApp({
    data() {
        return {
            catchphrase: "",
            autobio: "",
            bioimg: "",
            demos: [],
            papers: [],
            works: [],
            edus: [],
            skills: [],
            year: 2478,
            bioPic: false
        }
    },
    methods: {
        getYear() {
            return new Date().getFullYear();
        }
    },
    async created() {
        var that = this;
        const myData = await fetchData('data/rl.json');
        this.catchphrase = myData.phrase;
        this.demos = myData.portfolio;
        this.papers = myData.research;
        this.autobio = myData.about.bio;
        this.bioimg = myData.about.img;
        this.works = myData.about.cv.work;
        this.edus = myData.about.cv.education;
        this.skills = myData.about.cv.skills;
        this.year = this.getYear();
    },
    mounted() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3,
        };
        const observer = new IntersectionObserver(([entry]) => {	 
            if (entry && entry.isIntersecting) {
                if (entry.target.id === "sectionAbout") {
                    this.bioPic = true;
                }
            }
        }, options);
        observer.observe(this.$refs.fadeInPic);
    }
})

app.mount('#app');
