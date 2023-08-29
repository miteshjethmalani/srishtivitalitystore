import Cal from '@calcom/embed-react';
export default function CrystalConsultation() {
  
  return (
    <>
      <div className="flex flex-col justify-center ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl text-gray-900">
            Book Crystal Consultation Session
          </h2>
        </div>

        <Cal
          calLink="srishtivitality/crystal-consultation"
          config={{
            notes: 'Lets Connect with Srishtivitality.',
            theme: 'light',
          }}
        />
      </div>
    </>
  );
}
