/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Verify that every feed in the allFeeds object has 
         * a URL defined and that the URL is not empty.
         */
        it('url defined', () => {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* Verify that every feed in the allFeeds object has 
         * a name defined and that the name is not empty.
         */
        it('name defined', () => {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', () => {

        /* Verify that the menu element is hidden by default. */
        it('is hidden by default', () => {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        /* Verify that the menu changes visibility when the menu 
         * icon is clicked. This test has two expectations: does 
         * the menu display when clicked and does it hide when 
         * clicked again.
         */
        it('changes visibility when the menu icon is clicked', () => {
            const toggleMenu = document.querySelector('.menu-icon-link');

            // Test to check visibility of showing first since it's hidden by default
            toggleMenu.click();
            expect(document.body).not.toHaveClass('menu-hidden');

            // Test that menu can hide again
            toggleMenu.click();
            expect(document.body).toHaveClass('menu-hidden');
        });
    });
    /* Test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        /* Verify that when the loadFeed function (asynchronous) is called and 
         * completes its work, there is at least a single .entry element within 
         * the .feed container.
         */
        beforeEach((done) => {
            loadFeed(0, done);
        });

        it('has at least a single entry in feed', () => {
            const feed = document.querySelectorAll('.feed .entry').length;
            expect(feed > 0).toBe(true);
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        /* Verify that when a new feed is loaded by the loadFeed function 
         * that the content actually changes.
         */
        let firstFeed;

        beforeEach((done) => {
            loadFeed(0, () => {
                firstFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1, () => {
                    done();
                });
            });
        });

        it('has changed content', () => {
            let newFeed = document.querySelector('.feed').innerHTML;
            expect(newFeed).not.toEqual(firstFeed);
        });
    });
}());