import React, { useState, useEffect } from 'react';

const Content = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });



    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        const filtered = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.cou_name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.timezone.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredData(filtered);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedData = [...filteredData].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });

        setFilteredData(sortedData);
    };

    return (
        <div className="container mx-auto">
            <h1 className='text-4xl text-blue-600 mx-auto text-center'>Weather Forecast</h1>

            <input
                type="text"
                className="border mt-16 p-2 mb-4 w-full"
                placeholder="Search for a city..."
                value={ searchTerm }
                onChange={ handleSearchChange }
            />
            <table className="min-w-full divide-y mt-6 divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={ () => handleSort('name') }>City Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={ () => handleSort('cou_name_en') }>Country</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={ () => handleSort('timezone') }>Timezone</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    { filteredData.map((item) => (
                        <tr key={ item.recordid }>
                            <td className="px-6 py-4 whitespace-nowrap">{ item.name }</td>
                            <td className="px-6 py-4 whitespace-nowrap">{ item.cou_name_en }</td>
                            <td className="px-6 py-4 whitespace-nowrap">{ item.timezone }</td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
};

export default Content;
