'use client'


import Image from 'next/image'


function page() {
    return (
        <div>

            <h1>iamges useing</h1>


            <Image
                src="/imgg.jpeg"
                width={500}
                height={500}
                alt="Picture of the author"
            />
        </div>
    )
}

export default page