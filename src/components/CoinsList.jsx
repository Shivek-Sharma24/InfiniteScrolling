import React from 'react'
import SingleCard from './SingleCard'

const CoinsList = ({coinsData}) => {
  return (
    <div className='parent-card '>
        {coinsData.map((coins , index)=>{
            return (
                <SingleCard
                key={index}
                image={coins.image}
                name={coins.name}
                price={coins.current_price}
                />
            )
        })}
      

    </div>
  )
}

export default CoinsList
