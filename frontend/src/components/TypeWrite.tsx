import Typewriter from 'typewriter-effect';

export default function Type({ names }: { names: string[] }) {
  return (
    
    // <h1 className='bg-transparent text-xl font-bold'>
<Typewriter
        options={{
          
          strings:names,
          autoStart: true,
          loop: true,
        }}
      />
    // </h1>
      
   
      
  );
}
