import React from 'react';
import { Query } from 'react-apollo';
import { TOP_VENDEDORES } from '../../queries';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Vendedores = () => {
    return (
        <>
            <Query query={TOP_VENDEDORES}>
                {
                    ({ loading, error, data }) => {
                        if (loading) {
                            return "Cargando...";
                        }
                        if (error) {
                            return `Error: ${error.message}`
                        }

                        const chartData = data.topVendedores.map(vendedor => {
                            const { vendedor: [{ nombre }], total } = vendedor 

                            return {
                                name: `${nombre}`,
                                totalVentas: total
                            }
                        });

                        return (
                            <BarChart width={600} height={400} data={chartData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="totalVentas" />
                            </BarChart>    
                        );
                    }
                }
            </Query>
        </>
    )
};

export default Vendedores;