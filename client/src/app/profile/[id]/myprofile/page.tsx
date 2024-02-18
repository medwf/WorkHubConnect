

export default function UserProfile({ params }: any) {


    return (
      <div className='flex justify-center items-center '>
       {params.id}
       {params.firstName}
       {params.lastName}
       {params.email}
       {params.password}
       {params.type}
       {params.service}
       {params.region}
       {params.city}
       {params.cityId}
      </div>
    );
  }
  