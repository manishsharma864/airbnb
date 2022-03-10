import React from 'react'
import Header from "../components/Header"
import InfoCard from "../components/InfoCard"
import Footer from "../components/Footer"
import {useRouter} from "next/dist/client/router"
import {format} from "date-fns"

const Search = ({SearchResult}) => {
	 const router = useRouter()
const {location,startDate,endDate,noOfGuests}=router.query
const fomattedStartDate=format(new Date(startDate),"dd-MMMM-yy")
const fomattedEndDate=format(new Date(endDate),"dd-MMMM-yy")

const range = `${fomattedStartDate} - ${fomattedEndDate}`
	return (
		<div className="h-screen">
		<Header placeholder={`${location} | ${range} | ${noOfGuests} guests`}/>
		<main className="flex">
		<section className="flex-grow pt-14 px-6">
		<p className="text-xs ">300+-{range}  stays for {router.query.noOfGuests} guests</p>
		<h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {router.query.location}</h1>
		<div className="hidden sm:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
		<p className="button">Cancellation flexibility</p>
			<p className="button">Type of Place</p>
				<p className="button">Price</p>
					<p className="button">Rooms and Beds</p>
						<p className="button">More Filters</p>
		
		</div>
		<div className="flex flex-col">
		{
			SearchResult.map(({img,location,title,description,star,price,total})=>(
				<InfoCard 
				key={img}
				img={img} location={location} title={title} description={description} star={star} price={price} total={total}
				/>
				))
		}
		</div>

		</section>


		</main>
		<Footer />
		</div>
	)
}

export default Search

export async function getServerSideProps(){
	const SearchResult = await fetch("https://links.papareact.com/isz").then((res) => res.json());

	return{
		props:{
			SearchResult
		}
	}
}