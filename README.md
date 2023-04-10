
## Project Reflection



1. Did you run into any “gotchas” along the way? If so, what were they and how did you address them?
    1. HTTPS vs HTTP - API fetching - error reading
    2. Next rewrite - dove into docs
    3. Session Next Auth typing modification - dove into docs
2. How did you handle forms? In a largely form-driven project, would you do anything differently? If so, what?
    4. Formik - validation
    5. Less CLS - better UI
    6. Form driven project- I would use State MGMT like context, redux, etc.
    7. Likely not fetch one item at a time- did it to show off pagination for an array with a length of 4
3. How did you handle authorization? In your ideal FE/BE scenario, what auth strategy would you use?
    8. Used- Next auth - secure cookies & JWT tokens
    9. Ideal - Combination of JWT & Sessions- love to talk more about this.
    10. Passwordless / 2FA
4. Is there anything you’d like to share about your project prior to my evaluating it?
    11. I enjoyed it!
    12. With more time I would match the styling to Curbee
5. How long did you spend on this exercise? If you had unlimited more time to spend on this, how would you spend it and how would you prioritize each item?
    13. About 8 hours?
    14. Performance- Lighthouse scores
        1. Enormous network payloads #1 issue
            1. Minification: Minification involves removing whitespace and comments from your code, reducing its size. You can use a tool like UglifyJS or Terser to minify your code.
            2. Compression: Enabling compression for your assets can greatly reduce the network payload. Next.js supports gzip compression out of the box, which can be enabled by setting the "compression" configuration option.
            3. Caching: Caching can help reduce the number of requests made by the client, as assets that have already been downloaded are stored in the client's cache. You can use the "Cache-Control" header to set caching policies for your assets.
            4. Remove Unused Code and Assets: Make sure to remove any code and assets that are no longer being used in your application. This will reduce the size of your codebase and the network payload.
    15. User Experience / Interface - Styling
    16. Testing
    17. Reponsiveness
    18. Commenting / documentation