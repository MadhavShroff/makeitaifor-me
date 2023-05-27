import Image from 'next/image'
import { Inter } from 'next/font/google'
import GraphicElement from '@/components/GraphicElement'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <nav className="flex items-center justify-between p-6 bg-white shadow-lg">
        <div className="text-2xl font-bold text-black">MakeItAiFor.Me</div>
        <div className="flex gap-4">
          <a href="#" className="px-4 py-2 text-black rounded hover:bg-gray-200">About</a>
          <a href="#" className="px-4 py-2 text-black rounded hover:bg-gray-200">Products</a>
          <a href="#" className="px-4 py-2 text-black rounded hover:bg-gray-200">Contact Me</a>
          <a href="#" className="px-4 py-2 text-black rounded hover:bg-gray-200">Newsletter</a>
        </div>
      </nav>

      <section className="flex flex-col md:flex-row items-center justify-between p-6 md:p-20">
        <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left mb-4 md:mb-0">Welcome to Our Website</h1>
        <Image src="/logo.png" alt="Logo" width={500} height={500} className="md:w-500 md:h-500" quality={80} placeholder="blur" blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA...' unoptimized={true}/>
      </section>

      <section className="flex flex-col gap-10 p-10">
      <div className="flex flex-row items-start justify-between p-6 bg-transparent rounded shadow-lg border-2 border-white">
          <div>
            <h2 className="text-2xl font-bold">ChatGPT Pro</h2>
            <p>ChatGPT Pro is a cutting-edge AI tool that can carry out human-like text conversations. It&apos;s perfect for customer service, answering queries, and even for personal use as a virtual assistant.</p>
          </div>
          <div className="flex h-full md:w-400 md:h-400">
            <Image src="/logo.png" alt="Logo" width={400} height={400} />
          </div>
        </div>
        <div className="flex flex-row items-start justify-between p-6 bg-transparent rounded shadow-lg border-2 border-white">
          <div className="w-full h-full md:w-400 md:h-400">
            <Image src="/logo.png" alt="Logo" width={400} height={400} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">ChatGPT Pro</h2>
            <p>ChatGPT Pro is a cutting-edge AI tool that can carry out human-like text conversations. It&apos;s perfect for customer service, answering queries, and even for personal use as a virtual assistant.</p>
          </div>
        </div>
        <div className="flex flex-row items-start justify-between p-6 bg-transparent rounded shadow-lg border-2 border-white">
          <div>
            <h2 className="text-2xl font-bold">ChatGPT Pro</h2>
            <p>ChatGPT Pro is a cutting-edge AI tool that can carry out human-like text conversations. It&apos;s perfect for customer service, answering queries, and even for personal use as a virtual assistant.</p>
          </div>
          <div className="h-full md:w-400 md:h-400">
            <Image src="/logo.png" alt="Logo" width={400} height={400} />
          </div>
        </div>
      </section>

      <footer className="bg-orange-500 text-black py-20 mt-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-2/12 mb-8">
              <Image src="/logo.png" alt="Logo" width={100} height={100} />
            </div>
            <div className="w-full md:w-2/12 mb-8">
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
            </div>
            <div className="w-full md:w-4/12 mb-8 md:mb-0 flex flex-col items-start md:items-end">
              <ul className="flex space-x-4 mb-8">
                <li><Image src="/instagram.png" alt="Instagram" width={24} height={24} /></li>
                <li><Image src="/twitter.png" alt="Twitter" width={24} height={24} /></li>
                <li><Image src="/facebook.png" alt="Facebook" width={24} height={24} /></li>
              </ul>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Legal</a></li>
                <li><a href="#" className="hover:underline">Privacy Center</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Cookies</a></li>
                <li><a href="#" className="hover:underline">About Ads</a></li>
              </ul>
              <p className="mt-8 text-right">© 2023 Your Company</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
