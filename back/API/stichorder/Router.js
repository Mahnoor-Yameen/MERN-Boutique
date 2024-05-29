const express = require('express');
const router = express.Router();
const { CreateStitch,AllStitch,StitchReviews, StitchByStitchCategoryName, StitchByBrandName, StitchByName, StitchByID, UpdateStitch, DeleteStitch } = require('./Controller');


router.post('/create-Stitch', CreateStitch);
router.get('/get-stitch-by-name', StitchByName);
router.get('/get-stitch-by-brandname', StitchByBrandName);
router.get('/get-stitch-by-categoryname', StitchByStitchCategoryName);
router.get('/get-stitch-by-id', StitchByID);
router.get('/get-all-stitch', AllStitch);
router.put('/update-stitch', UpdateStitch);
router.delete('/delete-stitch', DeleteStitch);

// for rating purpose
router.post('/review-stitch', StitchReviews)

module.exports = router;
