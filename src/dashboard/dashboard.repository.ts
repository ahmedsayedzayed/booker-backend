import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../database/abstract.repository';
import { DashboardDocument } from './models/dashboard.schema';
import { Dashboard } from './models/dashboard.model';

@Injectable()
export class DashboardRepository extends AbstractRepository<DashboardDocument> {
  protected readonly logger = new Logger(DashboardRepository.name);

  constructor(
    @InjectModel(Dashboard.name) dashboardModel: Model<DashboardDocument>,
  ) {
    super(dashboardModel);
  }
}
