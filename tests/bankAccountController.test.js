const request = require('supertest');
const app = require('../src/app');

describe('testing For Bank Account controller', () => {
    describe('GET /api/v1/accounts', () => {
        test("should get all accounts - 200", () => {
            return request(app).get('/api/v1/accounts')
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body).toHaveProperty('message')
                    expect(res.body).toHaveProperty('data')
                    expect(res.body.status).toBe(true);
                    expect(res.body.message).toEqual('Berhasil menampilkan data akun')
                }
                )
        }
        )
    });

    describe('GET /api/v1/accounts/:accountId', () => {
        test("should get account by id", async () => {
            const response = await request(app).get('/api/v1/accounts/1');
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('data');
            expect(response.body.status).toBe(true);
            expect(response.body.message).toEqual('Berhasil menampilkan detail akun');
        });

        test("should return 404 if account not found", async () => {
            const response = await request(app).get('/api/v1/accounts/100');
            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Account not found');
        });
    });

    describe('POST /api/v1/accounts', () => {
        test("should create new account", async () => {
            const createAccount = await request(app).post('/api/v1/accounts').send({
                user_id: 7,
                bank_name: 'BANK 7',
                bank_account_number: '6135168',
                balance: 1000000
            });

            expect(createAccount.statusCode).toBe(201);
            expect(createAccount.body).toHaveProperty('message');
            expect(createAccount.body).toHaveProperty('account');
            expect(createAccount.body.status).toBe(true);
            expect(createAccount.body.message).toEqual('Akun berhasil dibuat');
        });
    });
});