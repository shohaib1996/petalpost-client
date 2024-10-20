import React from 'react';

const Gallery = () => {
  const images = [

    'https://www.treehugger.com/thmb/EKEpm0eclGmltQKp4iMEDdvZgu8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/close-up-of-a-women-watering-vegetables-in-a-raised-bed-1407277094-c63fd1ff0a21406ebf17c51ac6c6f2d1.jpg',
    'https://www.littletreegardenmarket.ca/files/images/news/5-basic-gardening-tips-for-beginners-1000x666-63c0263bc8247_n.webp',
    'https://tuingenoot.co.za/wp-content/uploads/2020/09/istockphoto-688966642-612x612-1-1024x585.jpg',
    'https://static.independent.co.uk/2021/12/17/16/newFile-7.jpg',
    'https://davidsuzuki.org/wp-content/uploads/2020/05/young-woman-gardening-holding-plant-e1590505674409-1024x640.jpg',
    'https://www.eurokidsindia.com/blog/wp-content/uploads/2023/11/growing-a-vegetable-garden-with-kids.jpg',
    'https://gardenkeyy.com/wp-content/uploads/2023/08/shutterstock_617324408.jpg',
    'https://www.saferbrand.com/media/Articles/Safer-Brand/Child-Friendly-Gardens.jpg',
    'https://www.ucdavis.edu/sites/default/files/styles/sf_landscape_16x9/public/media/images/Julia%20Schreiber003.JPG?h=4997dc06&itok=bWfpGDZa',
    'https://hips.hearstapps.com/hmg-prod/images/proud-gardener-royalty-free-image-539829042-1555499812.jpg',
    'https://www.thrive.org.uk/files/images/Get-involved/Volunteer/_hero/Man-gardening-on-allotment-patch.jpg',
    'https://static.independent.co.uk/2021/12/17/16/newFile-7.jpg',
    

  ];

  return (
    <div className="mt-24 mb-10">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Gardening Images</h1>
        <p>Recent Gardening Images</p>
      </div>

      {/* Static 4-column Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 max-w-7xl mx-auto">
        {images.map((src, index) => (
          <div key={index} className="w-full">
            <img src={src} alt={`Gallery image ${index + 1}`} className="w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
