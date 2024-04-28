import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Dashboard } from './models/dashboard.model';
import { DashboardSchema } from './models/dashboard.schema';
import { DashboardRepository } from './dashboard.repository';
import { DashboardResolver } from './dashboard.resolver';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Dashboard.name,
        schema: DashboardSchema,
      },
    ]),
  ],
  providers: [DashboardRepository, DashboardResolver, DashboardService],
})
export class DashboardModule {}
