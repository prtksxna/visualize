# Viz

![Deploy to WordPress.org](https://github.com/prtksxna/viz/workflows/Deploy%20to%20WordPress.org/badge.svg)
![Node.js CI](https://github.com/prtksxna/viz/workflows/Node.js%20CI/badge.svg)
![PHP Composer](https://github.com/prtksxna/viz/workflows/PHP%20Composer/badge.svg)

A Gutenberg block to add visualizations to your blog posts.

# Development

## Getting started

Use `npm install` to get all the dependencies and then `npm start` to watch the `src/` directory and build the files for use.

## Releasing

To cut a new release, first bump the version in:

1. `package.json`
2. `viz.php`

Then, commit these changes with the following message:

```
chore: bump version to X.Y.Z
```

Finally, add the tag appropriate tag and push all the changes:

```
git tag -a vX.Y.Z -m "vX.Y.Z"
git push origin master
git push origin --tags
```

The *Deploy to WordPress.org* action should automatically push it to [WordPress](https://github.com/prtksxna/viz).
