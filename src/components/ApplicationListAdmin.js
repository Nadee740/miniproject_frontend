import React from 'react'

function ApplicationListAdmin() {
    return (
        <div className='w-11/12 overflow-y-scroll no-scrollbar'>
            <table className='w-full relative table-auto'>
                <tr className='rounded-xl p-3 bg-primary text-center'>
                    <th className='p-3'>Sl.No</th>
                    <th className='p-3'>Admission Number</th>
                    <th className='p-3'>Name</th>
                    {/* <th className='p-3'>Programme</th> */}
                    <th className='p-3'>Certificate Name</th>
                    <th className='p-3'>Applied Date</th>
                    {/* <th className='p-3'>Status</th> */}
                    {/* <th className='p-3'>Status</th> */}
                    {/* <th className='p-3'>Download</th> */}
                </tr>
            </table>
        </div>
    )
}

export default ApplicationListAdmin