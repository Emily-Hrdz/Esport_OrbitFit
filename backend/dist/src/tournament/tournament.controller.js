"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const tournament_service_1 = require("./tournament.service");
let TournamentController = class TournamentController {
    constructor(tournamentService) {
        this.tournamentService = tournamentService;
    }
    async getAllTournaments(req) {
        console.log('🏆 GET /tournaments - User ID:', req.user?.userId);
        return this.tournamentService.getAllTournaments();
    }
    async createTournament(req, tournamentData) {
        console.log('✅ POST /tournaments - User ID:', req.user?.userId);
        console.log('📝 Datos torneo:', tournamentData);
        if (req.user?.role !== 'ADMINISTRADOR' && req.user?.role !== 'ENTRENADOR') {
            throw new Error('No autorizado');
        }
        return this.tournamentService.createTournament(tournamentData);
    }
    async updateTournament(req, tournamentId, tournamentData) {
        console.log('🔄 PUT /tournaments/:id - ID:', tournamentId);
        console.log('📝 Datos:', tournamentData);
        if (req.user?.role !== 'ADMINISTRADOR' && req.user?.role !== 'ENTRENADOR') {
            throw new Error('No autorizado');
        }
        return this.tournamentService.updateTournament(tournamentId, tournamentData);
    }
    async deleteTournament(req, tournamentId) {
        console.log('🗑️ DELETE /tournaments/:id - ID:', tournamentId);
        if (req.user?.role !== 'ADMINISTRADOR') {
            throw new Error('No autorizado');
        }
        return this.tournamentService.deleteTournament(tournamentId);
    }
    async getTournamentStats(req) {
        console.log('📊 GET /tournaments/stats - User ID:', req.user?.userId);
        return this.tournamentService.getTournamentStats();
    }
};
exports.TournamentController = TournamentController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentController.prototype, "getAllTournaments", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TournamentController.prototype, "createTournament", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], TournamentController.prototype, "updateTournament", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TournamentController.prototype, "deleteTournament", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentController.prototype, "getTournamentStats", null);
exports.TournamentController = TournamentController = __decorate([
    (0, common_1.Controller)('tournaments'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [tournament_service_1.TournamentService])
], TournamentController);
//# sourceMappingURL=tournament.controller.js.map