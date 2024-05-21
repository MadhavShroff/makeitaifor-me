import React, { useState } from 'react';
import Image from 'next/image';

type ContactFormData = {
  name: string,
  email: string,
  message: string;
}

const Footer: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://api.makeitaifor.me/contact-founder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log("Form submission success");
        setFormData({
          name: '',
          email: '',
          message: '' 
        });
        setShowNewsletterPopup(true);
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNewsletterResponse = async (subscribe: boolean) => {
    setShowNewsletterPopup(false);
    if (subscribe) {
      try {
        const newsletterResponse = await fetch('http://api.makeitaifor.me/newsletter/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email
          })
        });
        if (newsletterResponse.ok) {
          console.log("Subscription success");
        } else {
          console.error('Subscription failed');
        }
      } catch (error) {
        console.error('Newsletter submission error encountered', error);
      }
    }
  };

  return (
    <>
    <footer className="bg-orange-500 text-black py-20 mt-0 bottom-0 w-full static overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-4/12 mb-8">
            <Image src="/logo_nobg.png" alt="Logo" width={300} height={300} />
          </div>
          {/* <div className="w-full md:w-2/12 mb-8">
            <h2 className="font-bold mb-4">Company</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Jobs</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
            </ul>
          </div>
          <div className="w-full md:w-2/12 mb-8">
            <h2 className="font-bold mb-4">Communities</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Artists</a></li>
              <li><a href="#" className="hover:underline">Podcasters</a></li>
              <li><a href="#" className="hover:underline">Advertisers</a></li>
              <li><a href="#" className="hover:underline">Developers</a></li>
            </ul>
          </div>
          <div className="w-full md:w-2/12 mb-8">
            <h1 className="font-bold mb-4">Useful Links</h1>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Help</a></li>
              <li><a href="#" className="hover:underline">Web Player</a></li>
            </ul>
          </div> */}
          <div className="mr-32">
            <div>
              <h1 className="text-3xl mb-1">Get In Touch</h1>
              <p className="font-light">Get the dev team in trouble, or send them a complement!</p>
              <p className="mb-5 font-light">Get your feedback straight to our founder's inbox: </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-start" method="post" action="">
              
              <input className="mb-2 px-1 py-1 text-sm placeholder-base font-light rounded-lg w-7/12" type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="First Name" required />
              <input className="mb-2 px-1 py-1 text-sm placeholder-base font-light rounded-lg w-7/12" type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
              <textarea className= "px-1 py-2 text-sm placeholder-base font-light rounded-lg w-7/12" id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Message" required></textarea>

              <button className="mt-3 mb-4 pl-2 pr-2 rounded-full bg-white hover:bg-black hover:text-white whitespace-nowrap border border-black text-[var(--background-color)]" type="submit">Submit</button>
            </form>
          </div>
          
          <div className="w-full md:w-2/12 mb-8 md:mb-0 flex flex-col items-start">
            <ul className="flex space-x-4 mb-8">
              <li><a href='https://github.com/MadhavShroff'><Image src="/github.png" alt="Instagram" width={50} height={50} className="border-4 border-black border-2 rounded"/></a></li>
              <li><a href='https://github.com/MadhavShroff'><Image src="/twitter.png" alt="Twitter" width={50} height={50} /></a></li>
              <li><Image src="/linkedin.png" alt="Facebook" width={50} height={50} /></li>
            </ul>
            {/* <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Legal</a></li>
              <li><a href="#" className="hover:underline">Privacy Center</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Cookies</a></li>
            </ul> */}
            {/* <div className="mt-8"> Made with 💙 </div>
            <div> By Madhav Shroff </div> */}
          </div>
          <Image src="/image3.svg" alt="image" className="absolute w-[24vh] right-0 bottom-0" width={500} height={500} />
        </div>
      </div>
    </footer>
    {showNewsletterPopup && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-black p-8 rounded-lg">
          <h2 className="text-2xl text-white font-bold mb-4">Join <span className="text-orange-500">Our</span> Newsletter!</h2>
          <p className="text-white mb-4">Subscribe to our <span className="text-orange-500">newsletter</span> for <span className="text-orange-500">updates</span> and <span className="text-orange-500">news.</span></p>
          <button className="text-black border border-white rounded-full hover:underline text-white decoration-black hover:bg-white hover:text-black mt-4 px-4 py-2 rounded" onClick={() => handleNewsletterResponse(true)}>Subscribe</button>
          <button className="text-black border border-white rounded-full hover:underline text-white decoration-black hover:bg-white hover:text-black mt-4 ml-4 px-4 py-2 rounded" onClick={() => setShowNewsletterPopup(false)}>Close</button>
        </div>
      </div>
    )}
    </>
  );
};

export default Footer;