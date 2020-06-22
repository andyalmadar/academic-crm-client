import React from 'react';
import { Query } from 'react-apollo';
import { TOP_CLIENTES } from '../../queries';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Clientes = () => {
    return (
        <>
            <Query query={TOP_CLIENTES}>
                {
                    ({ loading, error, data }) => {
                        if (loading) {
                            return "Cargando...";
                        }
                        if (error) {
                            return `Error: ${error.message}`
                        }

                        const chartData = data.topClientes.map(cliente => {
                            const { cliente: [{ nombre, apellido }], total } = cliente 

                            return {
                                name: `${nombre} ${apellido}`,
                                totalCompras: total
                            }
                        });

                        return (
                            <BarChart width={600} height={400} data={chartData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="totalCompras" />
                            </BarChart>    
                        );
                    }
                }
            </Query>
        </>
    )
};

export default Clientes;