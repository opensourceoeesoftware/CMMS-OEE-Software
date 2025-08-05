from .serializers import EventSerializer
import logging
logger = logging.getLogger(__name__)
def time_calculator(events,resume_events,time_1,time_2, current_time):
    
    time = 0
    n = len(events)
    p = len(resume_events)
    #if no events returns 0
    
    if n==0 and p==0:
        
        return time
    
    delta_time = 0

    real_time = current_time - time_2
    real_time = real_time.days*24 + real_time.seconds / 3600
    if real_time < 0:
        time_2 = current_time

    # particular cases
    if n > p + 1:  
        return False
    
    elif p > n+1: 
        return False

    elif n==1 and p==0:
        # logger.warning('d = %s, n = %s, p = %s',n,n,p)
        time= time_2 - events[0].created_at
        time= time.days*24 + time.seconds / 3600
        return time

    elif n==0 and p==1:
        time= resume_events[0].created_at-time_1
        time= time.days*24 + time.seconds / 3600
        return time
    # end of particulare case
    
    # checking if vector is good
   
    delta_time = resume_events[0].created_at - events[0].created_at    
    delta_time = delta_time.days*24 + delta_time.seconds/(3600)
    #needed for automatic filling
    if delta_time ==0:
        delta_time = 1

    
    if (delta_time > 0 and not (n == p or n == p + 1)):
     
        return False

    elif  (delta_time < 0 and not (n == p or n == p-1)):
     
        return False
    # end of checking if vector is good

    # normal function
    
    if delta_time > 0 and n==p:
        for i in range(p):
            index_time = resume_events[i].created_at-events[i].created_at
            index_time = index_time.days*24 + index_time.seconds / 3600
            time = time +  index_time
        
        return time

    elif delta_time > 0 and n==p+1:
        for i in range(p):
            index_time = resume_events[i].created_at-events[i].created_at
            index_time = index_time.days*24 + index_time.seconds / 3600
            time = time +  index_time
        extra_time = time_2 - events[n-1].created_at 
        extra_time = extra_time.days*24 + extra_time.seconds / 3600
        # logger.warning('time= %s, extra time = %s',time,extra_time)
        #
        time = time + extra_time     
        
        return time

    elif delta_time < 0 and n==p:
        # logger.warning('here')
        for i in range(p-1):
            index_time = resume_events[i+1].created_at-events[i].created_at
            index_time = index_time.days*24 + index_time.seconds / 3600
            time = time +  index_time
            

        extra_time1 = resume_events[0].created_at - time_1
        extra_time1 = extra_time1.days*24 + extra_time1.seconds / 3600
        extra_time2 = time_2 - events[n-1].created_at
        extra_time2 = extra_time2.days*24 + extra_time2.seconds / 3600
        time = time + extra_time1 + extra_time2
        
        return time

    elif delta_time < 0 and n==p-1:
        for i in range(p-1):
            index_time = resume_events[i+1].created_at-events[i].created_at
            index_time = index_time.days*24 + index_time.seconds / 3600
            time = time +  index_time


        extra_time = resume_events[0].created_at - time_1
        extra_time = extra_time.days*24 + extra_time.seconds / 3600
        time = time + extra_time
        
        return time
    
    else:
        return 0

null_value = 1
def calculate_oee(all_events,t_1,t_2,now):
    
    # all_events = [e for e in all_events]
    
    event = [e for e in all_events if e.state == 'out of order']
    resume_event = [e for e in all_events if e.state == 'resume out of order']
    out_of_order_duration = time_calculator(event,resume_event,t_1,t_2,now)
    
    
    event = [e for e in all_events if e.state == 'failure']
    resume_event = [e for e in all_events if e.state == 'resume failure']
    machine_failure_duration = time_calculator(event,resume_event,t_1,t_2,now)

    event = [e for e in all_events if e.state == 'break out']
    resume_event = [e for e in all_events if e.state == 'resume break out']
    machine_break_out_duration = time_calculator(event,resume_event,t_1,t_2,now)

    event = [e for e in all_events if e.state == 'break in']
    resume_event = [e for e in all_events if e.state == 'resume break in']
    machine_break_in_duration = time_calculator(event,resume_event,t_1,t_2,now)

    # logger.warning('time= , extra time = ')
    event = [e for e in all_events if e.state == 'fault']
    resume_event = [e for e in all_events if e.state == 'resume fault']
    machine_fault_duration = time_calculator(event,resume_event,t_1,t_2,now)


    event = [e for e in all_events if e.state == 'run']
    resume_event = [e for e in all_events if e.state == 'stop']
    machine_run_duration = time_calculator(event,resume_event,t_1,t_2,now)

    event = [e for e in all_events if e.state == 'on']
    resume_event = [e for e in all_events if e.state == 'off']
    machine_on_duration = time_calculator(event,resume_event,t_1,t_2,now)

    # if(len(event) ==0 and len(resume_event) == 0):
    #     machine_on_duration= t_2 - t_1
    #     machine_on_duration= machine_on_duration.days*24 + machine_on_duration.seconds / 3600
    

    total_quantity = 0
    total_scrap = 0
    ideal_production_time =0
    reports = [r for r in all_events if r.state =='report']

    for report in reports:
        if report.product:
            total_quantity += report.quantity
            total_scrap += report.scrap
            ideal_production_time += report.quantity*report.product.ideal_cycle

    
    if now < t_2:
        t_2 = now
    
    if machine_run_duration == 0 and (total_quantity != 0 or machine_fault_duration != 0  or machine_break_in_duration != 0):
        machine_run_duration = t_2 - t_1
        machine_run_duration = machine_run_duration.days * 24 + machine_run_duration.seconds / 3600

    if machine_on_duration == 0 and (machine_run_duration != 0 or machine_failure_duration != 0 or machine_break_out_duration != 0 ): 
        machine_on_duration = t_2 - t_1
        machine_on_duration = machine_on_duration.days * 24 + machine_on_duration.seconds / 3600
    
    

    ideal_production_time = ideal_production_time / 60 # change it to hours to match all other times
    
    planned_production_time = machine_run_duration - machine_break_in_duration + machine_failure_duration
    run_time = planned_production_time - machine_fault_duration - machine_failure_duration

    if planned_production_time == 0:
        availability = null_value
    else:
        availability = run_time / planned_production_time

    if availability > 1 :
        availability = 1
    
    if run_time == 0:
        performance = null_value
    else:
        performance = ideal_production_time / run_time

    if performance > 1:
        performance = 1

    if total_quantity == 0 :
        quality = null_value
    else:
        quality = (total_quantity-total_scrap)/total_quantity

    if quality > 1 :
        quality = 1

    oee = availability * performance * quality * 100
 
    res = {
        "availability":availability,
        "performance" : performance,
        "quality": quality,
        'out_of_order_duration':out_of_order_duration,
        'machine_on_duration':machine_on_duration,
        'machine_run_duration':machine_run_duration,
        'machine_break_in_duration':machine_break_in_duration,
        'machine_break_out_duration':machine_break_out_duration,
        'machine_failure_duration' : machine_failure_duration,
        'machine_fault_duration':machine_fault_duration,
        'oee':oee

    }
    return res

def calculate_faults(events,faults,cells):
    total_faults = len(events)
    out_of = [e for e in events if e.state=='out of order']
    res = {
            "cells":[],
            "faults": [],
            "total_faults":total_faults,
            "events": EventSerializer(events,many=True).data
        }
    # time.sleep(7)
  
    idx = 0 
    for cell in cells :
        a = [e for e in events if e.cell==cell]
        if  a: 
            res["cells"].append({"cell":cell.cell_name,"count":len(a)})

    for fault in faults :
        a = [e for e in events if e.fault==fault]
        if a :
            res["faults"].append({"fault":fault.fault_name,"count":len(a)})
    return res




longest_sequences = {
    
'off': [ 'off', 'out of order', 'resume out of order', 'on', 'failure', 'resume failure', 'run',  'fault', 'resume fault', 'report', 'stop'],

'out of order': ['out of order', 'resume out of order', 'on', 'failure', 'resume failure',  'run', 'fault', 'resume fault', 'report', 'stop','off'],

'resume out of order': ['resume out of order','on', 'failure', 'resume failure',  'run',  'fault', 'resume fault', 'report', 'stop',  'off'],

'on': ['on','failure', 'resume failure',  'run',  'fault', 'resume fault', 'report', 'stop', 'off', 'out of order', 'resume out of order'],

'failure': ['failure','resume failure',  'run',  'fault', 'resume fault', 'report', 'stop', 'off', 'out of order', 'resume out of order', 'on'],

'resume failure': ['resume failure',  'run', 'fault', 'resume fault', 'report', 'stop', 'off','out of order', 'resume out of order', 'on'],


'run': ['run', 'fault', 'resume fault', 'report', 'stop','off', 'out of order', 'resume out of order', 'on', 'failure', 'resume failure'],



'fault': ['fault','resume fault', 'report', 'stop','off', 'out of order', 'resume out of order', 'on', 'failure', 'resume failure',  'run'],

'resume fault': ['resume fault','report', 'stop', 'off', 'out of order', 'resume out of order', 'on', 'failure', 'resume failure', 'run'],

'report': ['report','stop', 'off', 'out of order', 'resume out of order', 'on', 'failure', 'resume failure', 'run',  'fault', 'resume fault'],

'stop': ['stop','off', 'out of order', 'resume out of order', 'on', 'failure', 'resume failure',  'run', 'fault', 'resume fault', 'report'],
}
allowed_to_skip_fill = {
    'on': ['off', 'resume out of order'],
    'off': ['on', 'resume failure', 'resume break out', 'stop'],
    'run': ['on', 'stop', 'resume failure', 'resume break out'],
    'stop': ['run', 'resume break in', 'resume fault', 'report'],
    'break in': ['run', 'resume break in', 'resume fault', 'report'],
    'resume break in': ['break in'],
    'failure': ['on', 'resume failure', 'resume break out', 'stop'],
    'resume failure': ['failure'],
    'report': ['run', 'report', 'resume fault', 'resume break in'],
    'fault': ['run', 'resume fault', 'resume break in', 'report'],
    'resume fault': ['fault'],
    'break out': ['on', 'resume break out', 'resume failure', 'stop'],
    'resume break out': ['break out'],
    'out of order': ['off', 'resume out of order'],
    'resume out of order': ['out of order'],
}
needed_req = {
    'on': ['off'],
    'off': ['stop'],
    'run': ['on'],
    'stop': ['run'],
    'break in': ['run','on'],
    'resume break in': ['break in','on','run'],
    'failure': ['on'],
    'resume failure': ['failure','on'],
    'report': ['run','on'],
    'fault': ['run','on'],
    'resume fault': ['fault','on','run'],
    'break out': ['on'],
    'resume break out': ['break out','on'],
    'out of order': ['off'],
    'resume out of order': ['out of order','off','stop'],
}
def get_missing_states(last_state, new_state):
   
    required_states = []
    sequence = longest_sequences[last_state]
    
    if new_state in sequence:
        current_state_index = sequence.index(last_state)
        new_state_index = sequence.index(new_state)
        
        if new_state_index > current_state_index:
            required_states = sequence[current_state_index + 1 : new_state_index]
        else:
            required_states = sequence[current_state_index + 1 :]
    
    return required_states

